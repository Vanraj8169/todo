import ModeToggle from "@/components/ui/mode-toggle.jsx";

const Header = () => {
  return (
    <nav className="fixed w-full flex items-center justify-between px-6 py-2   backdrop-blur-md  shadow-md">
      <div className="text-xl font-extrabold text-purple-950 dark:text-[#a78bfa] ">TODO</div>
      <ModeToggle />
    </nav>
  );
};

export default Header;
