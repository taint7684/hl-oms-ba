"""Sinh 07_UIUX/prototype/data.js từ dữ liệu mẫu ở 06_Function_Feature_State/data/*.csv."""
import csv
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "06_Function_Feature_State/data"
OUT = ROOT / "07_UIUX/prototype/data.js"


def rows(name):
    with open(SRC / name, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def cents(v):
    return int(round(float(v) * 100)) if v else None


ref = rows("reference.csv")
by_type = {}
for r in ref:
    by_type.setdefault(r["type"], []).append(r)


def mod_options(note):
    out = []
    for part in note.split(" · "):
        name, price = part.rsplit(" +", 1)
        out.append({"name": name.strip(), "price": cents(price)})
    return out


data = {
    "menu": [{"id": m["id"], "cat": m["category"], "vi": m["name_vi"], "en": m["name_en"], "price": cents(m["price"]),
              "lunch": cents(m["lunch_price"]), "station": m["station"],
              "allergens": [a for a in m["allergens"].split("|") if a],
              "mods": [g for g in m["modifier_groups"].split("|") if g], "active": m["active"] == "Y"}
             for m in rows("menu.csv")],
    "cats": [{"id": r["code"], "vi": r["name_vi"], "en": r["name_en"]} for r in by_type["CATEGORY"]],
    "stations": [{"id": r["code"], "vi": r["name_vi"], "en": r["name_en"], "late": int(r["value"])} for r in by_type["STATION"]],
    "allergens": [{"id": r["code"], "vi": r["name_vi"], "en": r["name_en"]} for r in by_type["ALLERGEN"]],
    "modifiers": {r["code"]: {"vi": r["name_vi"], "en": r["name_en"], "required": r["value"] == "REQUIRED",
                              "options": mod_options(r["note"])} for r in by_type["MODIFIER"]},
    "cancelReasons": [{"id": r["code"], "vi": r["name_vi"]} for r in by_type["CANCEL_REASON"]],
    "discountReasons": [{"id": r["code"], "vi": r["name_vi"]} for r in by_type["DISCOUNT_REASON"]],
    "surcharge": int(by_type["SURCHARGE"][0]["value"]),
    "tables": [{"code": t["code"], "zone": t["zone"], "seats": int(t["seats"])} for t in rows("tables.csv")],
    "users": rows("users.csv"),
    "holidays": rows("holidays.csv"),
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("/* AUTO-GENERATED bởi tools/build_proto_data.py từ 06_Function_Feature_State/data — không sửa tay */\n"
               f"window.HL_DATA = {json.dumps(data, ensure_ascii=False, separators=(',', ':'))};\n",
               encoding="utf-8", newline="\n")
print(f"data.js: {len(data['menu'])} món, {len(data['tables'])} bàn, {len(data['users'])} user")
