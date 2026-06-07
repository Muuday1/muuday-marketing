#!/usr/bin/env python3
"""
Mixagem completa de episódio do podcast Muuday.
Pipeline: processa segmentos → concatena → mixa música bed → aplica efeitos → loudnorm final.
"""

import json, os, subprocess, sys, tempfile, math

# ── CONFIGURAÇÃO ────────────────────────────────────────────────────────────
EPISODE_ID = "EP001_flertei-com-a-policia"
RAW_DIR = f"public/audio/podcast/episodios/{EPISODE_ID}/raw"
OUT_DIR = f"public/audio/podcast/episodios/{EPISODE_ID}"
ABERTURA = "public/audio/podcast/abertura/abertura-oficial.mp3"
FECHAMENTO = "public/audio/podcast/abertura/fechamento-oficial.mp3"
MUSICA_BED = "public/audio/podcast/abertura/musica-bed-oficial.mp3"
EFEITOS_DIR = "public/audio/podcast/efeitos"
ROTEIRO = "public/audio/podcast/roteiros/EP001_final.json"

# Parâmetros de processamento
ATEMPO = "1.01"
ASETRATE = "43700"
LOUDNORM = "I=-16:TP=-1.5:LRA=11"
ROOMTONE_VOL = "0.025"
BED_GAIN = "0.12"        # Volume da música bed (0.0-1.0)
BED_DELAY = 2.0          # Segundos de delay antes da música começar

# Efeitos sonoros — mapear tag → efeito (None = nenhum)
TAG_TO_EFFECT = {
    "smiling": None,
    "laughs": None,
    "narrating": None,
    "sighs": None,
    "whispering": None,
    "warm": None,
    "excited": None,
    "surprised": None,
    "shocked": "impact-hit.mp3",
    "tense": "bed-suspense.mp3",
    "romantic": "bed-warm.mp3",
    "dramatic": "impact-boom.mp3",
    "happy": "bed-uplifting.mp3",
}

os.makedirs(OUT_DIR, exist_ok=True)


def run(cmd: list[str], check=True) -> str:
    """Roda comando e retorna stdout."""
    result = subprocess.run(cmd, capture_output=True, text=True, check=check)
    return result.stdout + result.stderr


def get_duration(path: str) -> float:
    """Retorna duração em segundos."""
    out = run([
        "ffprobe", "-i", path,
        "-show_entries", "format=duration",
        "-v", "quiet", "-of", "csv=p=0"
    ], check=False)
    try:
        return float(out.strip())
    except ValueError:
        return 0.0


def process_segment(input_path: str, output_path: str) -> float:
    """Aplica pipeline ffmpeg no segmento. Retorna duração final."""
    # atempo + asetrate (leve speed-up + brilho) + loudnorm
    cmd = [
        "ffmpeg", "-y", "-i", input_path,
        "-af",
        f"atempo={ATEMPO},asetrate={ASETRATE},aresample=44100,loudnorm={LOUDNORM}",
        "-ar", "44100", "-ac", "2", "-b:a", "192k",
        output_path
    ]
    run(cmd)
    return get_duration(output_path)


def build_concat_list(segments_info: list, processed_dir: str) -> str:
    """Cria arquivo de lista para concat demux."""
    list_path = os.path.join(processed_dir, "concat_list.txt")
    with open(list_path, "w") as f:
        for i in range(len(segments_info)):
            seg_file = os.path.join(processed_dir, f"seg{i+1:02d}.mp3")
            f.write(f"file '{os.path.abspath(seg_file)}'\n")
    return list_path


def concatenate_audio(list_path: str, output_path: str):
    """Concatena arquivos via concat demux."""
    run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", list_path, "-c", "copy", output_path
    ])


def mix_with_bed(voice_path: str, bed_path: str, output_path: str, voice_dur: float):
    """Mixa voz com música bed (loop, volume baixo, delay)."""
    # Cria loop da música bed para cobrir a duração total + delay
    bed_dur = get_duration(bed_path)
    loops = math.ceil((voice_dur + BED_DELAY) / bed_dur) if bed_dur > 0 else 1

    # Arquivo bed looped
    bed_looped = os.path.join(OUT_DIR, "_bed_looped.mp3")
    run([
        "ffmpeg", "-y", "-stream_loop", str(loops - 1), "-i", bed_path,
        "-t", str(voice_dur + BED_DELAY + 5),
        "-c", "copy", bed_looped
    ])

    # Aplica delay e volume na bed, depois mixa com voz
    # Usamos adelay + volume na bed, depois amix
    bed_delayed = os.path.join(OUT_DIR, "_bed_delayed.mp3")
    delay_ms = int(BED_DELAY * 1000)
    run([
        "ffmpeg", "-y", "-i", bed_looped,
        "-af", f"adelay={delay_ms}|{delay_ms},volume={BED_GAIN}",
        "-ar", "44100", "-ac", "2", bed_delayed
    ])

    # Mix
    run([
        "ffmpeg", "-y", "-i", voice_path, "-i", bed_delayed,
        "-filter_complex",
        "[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "[aout]", "-ar", "44100", "-ac", "2", "-b:a", "192k",
        output_path
    ])

    # Cleanup temp
    for f in [bed_looped, bed_delayed]:
        if os.path.exists(f):
            os.remove(f)


def apply_final_loudnorm(input_path: str, output_path: str):
    """Aplica loudnorm final no arquivo master."""
    run([
        "ffmpeg", "-y", "-i", input_path,
        "-af", f"loudnorm={LOUDNORM}:print_format=summary",
        "-ar", "44100", "-ac", "2", "-b:a", "192k",
        output_path
    ])


def build_episode_structure(
    abertura_path: str,
    corpo_path: str,
    fechamento_path: str,
    outro_path: str,
    output_path: str
):
    """Concatena abertura → corpo → fechamento → outro."""
    list_path = os.path.join(OUT_DIR, "_structure_list.txt")
    with open(list_path, "w") as f:
        f.write(f"file '{os.path.abspath(abertura_path)}'\n")
        # Pequeno gap de 0.3s entre abertura e corpo (silêncio ou sting)
        gap = os.path.join(OUT_DIR, "_gap.mp3")
        run([
            "ffmpeg", "-y", "-f", "lavfi", "-i",
            "anullsrc=r=44100:cl=stereo", "-t", "0.3", "-acodec", "libmp3lame", "-b:a", "192k",
            gap
        ])
        f.write(f"file '{os.path.abspath(gap)}'\n")
        f.write(f"file '{os.path.abspath(corpo_path)}'\n")
        # Pequeno gap antes do fechamento
        gap2 = os.path.join(OUT_DIR, "_gap2.mp3")
        run([
            "ffmpeg", "-y", "-f", "lavfi", "-i",
            "anullsrc=r=44100:cl=stereo", "-t", "0.5", "-acodec", "libmp3lame", "-b:a", "192k",
            gap2
        ])
        f.write(f"file '{os.path.abspath(gap2)}'\n")
        f.write(f"file '{os.path.abspath(fechamento_path)}'\n")
        f.write(f"file '{os.path.abspath(outro_path)}'\n")

    run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", list_path, "-c", "copy", output_path
    ])

    # Cleanup
    for f in [list_path, gap, gap2]:
        if os.path.exists(f):
            os.remove(f)


def main():
    # ── 1. Carregar roteiro ─────────────────────────────────────────────────
    with open(ROTEIRO) as f:
        segments = json.load(f)

    print(f"🎙️  Episódio: {EPISODE_ID}")
    print(f"   {len(segments)} segmentos para processar\n")

    # ── 2. Processar cada segmento ──────────────────────────────────────────
    processed_dir = os.path.join(OUT_DIR, "processed")
    os.makedirs(processed_dir, exist_ok=True)

    total_raw_dur = 0.0
    total_proc_dur = 0.0

    for i, seg in enumerate(segments):
        raw = os.path.join(RAW_DIR, f"seg{i+1:02d}.mp3")
        proc = os.path.join(processed_dir, f"seg{i+1:02d}.mp3")

        raw_dur = get_duration(raw)
        total_raw_dur += raw_dur

        if os.path.exists(proc):
            proc_dur = get_duration(proc)
            print(f"  ✅ seg{i+1:02d} [{seg['tag']}] já processado ({proc_dur:.1f}s)")
        else:
            proc_dur = process_segment(raw, proc)
            print(f"  🔧 seg{i+1:02d} [{seg['tag']}] processado ({raw_dur:.1f}s → {proc_dur:.1f}s)")

        total_proc_dur += proc_dur

    print(f"\n   Duração bruta:   {total_raw_dur:.1f}s ({total_raw_dur/60:.1f}min)")
    print(f"   Duração process: {total_proc_dur:.1f}s ({total_proc_dur/60:.1f}min)")

    # ── 3. Concatenar segmentos ─────────────────────────────────────────────
    print("\n🔗 Concatenando segmentos...")
    concat_list = build_concat_list(segments, processed_dir)
    corpo_path = os.path.join(OUT_DIR, "_corpo.mp3")
    concatenate_audio(concat_list, corpo_path)
    corpo_dur = get_duration(corpo_path)
    print(f"   Corpo: {corpo_dur:.1f}s")

    # ── 4. Não mixar bed no corpo (música só em abertura/fechamento) ───────
    # A abertura e fechamento oficiais já contêm música embutida.
    # O corpo da história fica com voz pura para não cansar o ouvinte.
    corpo_mixed = corpo_path
    print("\n🎵 Corpo sem bed (música só em abertura/fechamento)")

    # ── 5. Montar estrutura final ──────────────────────────────────────────
    print("\n🏗️  Montando estrutura final...")
    master_raw = os.path.join(OUT_DIR, "_master_raw.mp3")
    build_episode_structure(ABERTURA, corpo_mixed, FECHAMENTO, FECHAMENTO, master_raw)
    # Nota: usando FECHAMENTO como outro também, já que fechamento-oficial.mp3 já contém CTA + despedida
    print(f"   Master raw: {get_duration(master_raw):.1f}s")

    # ── 6. Loudnorm final ──────────────────────────────────────────────────
    print("\n📢 Aplicando loudnorm final...")
    master_final = os.path.join(OUT_DIR, f"{EPISODE_ID}_master.mp3")
    apply_final_loudnorm(master_raw, master_final)
    final_dur = get_duration(master_final)
    print(f"   Master final: {final_dur:.1f}s ({final_dur/60:.1f}min)")

    # ── 7. Cleanup temp ────────────────────────────────────────────────────
    for f in [corpo_path, corpo_mixed, master_raw]:
        if os.path.exists(f):
            os.remove(f)

    print(f"\n✅ EPISÓDIO PRONTO!")
    print(f"   📁 {master_final}")
    print(f"   ⏱️  {final_dur:.1f}s ({final_dur/60:.1f} minutos)")
    print(f"   🔊 Normalizado a -16 LUFS")


if __name__ == "__main__":
    main()
