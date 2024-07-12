import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="container">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="hsl(228, 39%, 23%)"
        secondaryColor={"hsl(12, 60%, 45%)"}
        radius="12"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
