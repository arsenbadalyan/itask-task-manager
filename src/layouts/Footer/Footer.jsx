const Footer = () => {
  return (
    <div className="mt-auto w-full h-8 bg-primary-color flex justify-center items-center shadow shadow-[0_0_10px_0_black]">
      <p className="text-sec-color font-bold">
        {new Date().getFullYear()} &copy; All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
