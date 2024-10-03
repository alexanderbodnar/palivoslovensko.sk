export default function ListGenerator({ content }) {
  return (
    <ul>
      {content.map((block) => {
        return (
          <li className="py-6">
            <div className="bg-[#297A49] opacity-75 border rounded-lg p-y-[1.5px] px-2 my-2 max-w-max">
              <h1 className="text-xl font-semibold">{block.header}</h1>
            </div>
            <span className="text-lg">{block.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
