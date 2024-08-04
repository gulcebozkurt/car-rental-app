import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-width flex justify-between items-center px-6 py-4">
        <Link to="/">
          <img src="/rent.png" width={130} className="" />
        </Link>

        <Button title="Sign Up" designs="min-w-[100px]" />
      </nav>
    </header>
  );
};

export default Header;