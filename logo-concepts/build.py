# Builds three GH27 logo concepts (symbols + lockups with outlined wordmark) as SVG.
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

INK = "#0a0a0a"
font = TTFont(os.path.expanduser("~/Library/Fonts/Inter-VariableFont_opsz,wght.ttf"))
font = instantiateVariableFont(font, {"wght": 600, "opsz": 32})
gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm

def wordmark(text, size, x0, baseline, tracking=-0.045):
    """Outlined text as one path string; returns (d, width)."""
    s, x, d = size / upm, x0, []
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        d.append(pen.getCommands())
        x += gs[name].width * s + tracking * size
    return " ".join(d), x - x0 - tracking * size

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" '
            f'aria-label="{title}"><title>{title}</title>{body}</svg>\n')

# A: Barcode. Widths follow the real group totals (rare, NCD, cancer, pharmaco, infectious), equal heights.
def sym_a(accent=INK):
    widths, gap, x, out = [66, 51, 33, 15, 11], 14, 12, []
    for i, w in enumerate(widths):
        out.append(f'<rect x="{x}" y="16" width="{w}" height="224" fill="{accent if i == 0 else INK}"/>')
        x += w + gap
    return "".join(out)

# B: GH monogram built from one stroke weight (40) on tall bar proportions; the H crossbar can carry the accent.
def sym_b(accent=INK):
    # Letter test: the G needs its inward arm to stand clear of the left stem, or it reads as a 6.
    G = 'M16 16H124V48H48V208H92V144H68V112H124V240H16Z'
    H = 'M140 16H172V240H140Z M208 16H240V240H208Z'
    return (f'<path d="{G}" fill="{INK}"/><path d="{H}" fill="{INK}"/>'
            f'<rect x="172" y="96" width="36" height="32" fill="{accent}"/>')

# C: Slash. Two bars and a 15 degree vermilion-ready slash, from the site's "/ Heading." rule.
def sym_c(accent=INK):
    return (f'<rect x="20" y="16" width="52" height="224" fill="{INK}"/>'
            f'<rect x="88" y="16" width="30" height="224" fill="{INK}"/>'
            f'<polygon points="136,240 176,240 236,16 196,16" fill="{accent}"/>')

concepts = {"a-barcode": sym_a, "b-gh": sym_b, "c-slash": sym_c}
for name, fn in concepts.items():
    for tag, acc in (("", INK), ("-color", "#ff4a1c")):
        open(f"{name}{tag}-symbol.svg", "w").write(svg(256, 256, fn(acc), f"GH27 {name}"))
    d, w = wordmark("GeTH Hackathon", 100, 0, 0)
    # horizontal lockup: symbol 256 high, wordmark baseline so x-height centres on the symbol
    tx, base = 256 + 56, 128 + 36
    d, w = wordmark("GeTH Hackathon", 100, tx, base)
    W = int(tx + w + 16)
    open(f"{name}-lockup.svg", "w").write(svg(W, 256, fn(INK) + f'<path d="{d}" fill="{INK}"/>', f"GH27 {name} lockup"))
print("ok")
