import redirect from "../../assets/redirect.svg";

function Card(props: {
  key: number;
  title: string;
  description: string;
  image: string;
  externalLink: string;
  buttonText?: string;
  buttonLink?: string;
}) {
  return (
    <div
      key={props.key}
      className="h-[600px] md:h-[420px] w-full max-w-[1280px] m-auto flex flex-col items-center justify-center border-2 rounded-2xl bg-[#202124] p-6"
    >
      <div className="flex flex-row items-center justify-between pb-6 border-b-2 w-full">
        <h1 className="text-4xl md:text-6xl">{props.title}</h1>
        <a
          href={props.externalLink}
          target="_blank"
          rel="noreferrer"
          className="flex flex-row items-center justify-center"
        >
          <img
            src={redirect as string}
            alt="arrow"
            className="h-20 p-2 hover:p-0 w-auto transition-all "
          />
        </a>
      </div>
      <div className="h-full flex flex-col-reverse md:flex-row  items-center justify-around md:justify-between w-full">
        <div className="flex flex-col gap-4">
          <p className="text-2xl md:text-3xl max-w-[600px]">
            {props.description}
          </p>
          {props.buttonText && (
            <a
              href={props.buttonLink}
              target="_blank"
              rel="noreferrer"
              className="text-xl flex flex-row items-center justify-center border rounded-full p-2 px-4 leading-none w-fit hover:bg-black"
            >
              <span className="text-2xl leading-none m-2">↗</span> {props.buttonText}
            </a>
          )}
        </div>
        <img src={props.image} className="max-h-[280px] w-auto max-w-[400px]" />
      </div>
    </div>
  );
}

export default Card;
