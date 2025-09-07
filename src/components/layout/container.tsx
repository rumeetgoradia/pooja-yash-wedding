import { cn } from "~/lib/utils";

interface ContainerProps {
  variant?: "top" | "bottom";
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ variant, children }) => {
  return (
    <div
      className={cn(
        "container mx-auto w-full max-w-6xl px-4",
        variant === "top" && "pt-6",
        variant === "bottom" && "pb-6",
      )}
    >
      <div
        className={cn(
          "bg-background relative z-[1] w-full px-6 drop-shadow-md",
          variant === "top" && "rounded-t-sm pt-6",
          variant === "bottom" && "rounded-b-sm pb-6",
        )}
      >
        <div
          className={cn(
            "bg-background border-l-primary/75 border-r-primary/75 w-full border-r-4 border-l-4 px-4 py-6",
            variant === "top" && "border-t-primary/75 rounded-t-sm border-t-4",
            variant === "bottom" &&
              "border-b-primary/75 rounded-b-sm border-b-4",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
