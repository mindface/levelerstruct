export const tagView = (tags: string) => {
  if (!tags) return;
  const list = tags.split(",");
  return list.map((item, index) => {
    return (
      <span key={index} className="tag mr-1">
        {item}
      </span>
    );
  });
};
