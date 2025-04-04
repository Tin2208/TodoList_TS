import Header from "../layouts/Header";
import Content from "../layouts/Content";

const container = () => {
  return (
    <div className="mx-auto max-w-[1200px] w-[90%]">
      <Header />
      <Content />
    </div>
  );
};

export default container;
