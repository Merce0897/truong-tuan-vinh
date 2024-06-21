
import FormExchange from "./components/FormExchange";

function App() {

  return (
    <div className="h-[100vh] z-10 flex justify-center items-center">
      <div className="w-[590px] h-[400px] bg-slate-400 z-0 rounded-full absolute z-1 top-1/2 left-1/2 translate-x-[-1/2] translate-y-[-1/2] blur-[90px]" />
      <FormExchange />
    </div>

  );
}

export default App;
