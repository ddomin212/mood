const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white/10 shadow">
      <div className="px-4 py-5 sm:px-6 text-sm text-white/50 h-[275px]">
        {entry.content.substring(0, 500) + "..."}
      </div>
      <div className="px-4 py-5 text-sm sm:px-6">{date}</div>
    </div>
  );
};

export default EntryCard;
