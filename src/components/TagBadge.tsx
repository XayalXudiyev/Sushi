import { tagLabels, type Tag } from "@/data/menu";

const styles: Record<Tag, string> = {
  hit: "bg-brand text-white",
  new: "bg-gold text-ink",
  spicy: "bg-orange-600/90 text-white",
  veg: "bg-emerald-600/90 text-white",
};

const icons: Record<Tag, string> = { hit: "★", new: "✦", spicy: "🌶", veg: "🌿" };

export default function TagBadge({ tag }: { tag: Tag }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[tag]}`}>
      <span aria-hidden="true">{icons[tag]}</span>
      {tagLabels[tag]}
    </span>
  );
}
