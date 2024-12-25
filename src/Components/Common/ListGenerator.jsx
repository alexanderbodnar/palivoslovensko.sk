export default function ListGenerator({ content, CustomComponent }) {
  console.log(CustomComponent);
  return (
    <ul>
      {content.map((block, index) => {
        return (
          <li className="py-6" key={block.header.length + index}>
            <div className="bg-[#297A49] opacity-75 border rounded-lg p-y-[1.5px] px-2 my-2 max-w-max">
              <h1 className="text-xl font-semibold opacity-100 text-black-900">
                {block.header}
              </h1>
            </div>
            <span className="text-lg">{block.text}</span>
          </li>
        );
      })}
      {CustomComponent && <CustomComponent />}
    </ul>
  );
}
