"""Sinh lại toàn bộ sản phẩm từ bản nguồn và chạy các bước kiểm. Thoát ≠ 0 nếu một bước lỗi."""
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
T = Path(__file__).resolve().parent
STEPS = [
    ("Log → Excel", ["build_registers.py"]),
    ("Slide họp 1", ["build_meeting01_deck.py"]),
    ("User Story Map", ["build_story_map.py"]),
    ("BPMN", ["build_bpmn.py"]),
    ("UCD + Activity", ["build_uml.py"]),
    ("BFD", ["build_bfd.py"]),
    ("Mermaid (state, sitemap, flow)", ["mermaid.py", str(T.parent / "06_Function_Feature_State/diagrams"), str(T.parent / "07_UIUX/diagrams")]),
    ("Dữ liệu prototype", ["build_proto_data.py"]),
    ("Kiểm prototype E2E + ảnh màn hình", ["test_prototype.py"]),
    ("RTM + kiểm truy vết", ["build_rtm.py"]),
    ("Word (BRD, SRS, UAT…)", ["build_docs.py"]),
    ("Pitch deck", ["build_pitch_deck.py"]),
]
fail = 0
for name, args in STEPS:
    r = subprocess.run([sys.executable, str(T / args[0]), *args[1:]], capture_output=True, text=True, encoding="utf-8")
    ok = r.returncode == 0
    fail += not ok
    print(f"{'OK ' if ok else 'LỖI'} {name}")
    if not ok:
        print((r.stdout + r.stderr)[-1500:])
sys.exit(1 if fail else 0)
