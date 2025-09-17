import os, json

IMAGENES_PATH = "icons"
OUTPUT_JSON = "images.json"

# listar imágenes y ordenarlas alfabéticamente para tener un orden fijo
image_files = sorted([f for f in os.listdir(IMAGENES_PATH) if f.lower().endswith((".png", ".jpg", ".jpeg"))])

# asignar número empezando en 1
images_data = [{"id": idx+1, "file": f"icons/{fname}"} for idx, fname in enumerate(image_files)]

# guardar en JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(images_data, f, indent=2, ensure_ascii=False)

print(f"Archivo {OUTPUT_JSON} generado con {len(images_data)} imágenes.")
