export default function Navbar(){
    return <div>
         <nav className="grid grid-cols-10 h-18 ">
        <div className="col-span-4">
            <img src="https://tse1.mm.bing.net/th/id/OIP.OFAJjiEH5qsHo77r9dY64gHaEK?pid=Api&rs=1&c=1&qlt=95&w=219&h=123" className="w-30 h-20 p-3 ml-3"></img>
        </div>
        <div className="col-span-4 flex flex-row gap-7 p-4 font-semibold my-1">
            <button className="cursor-pointer">MENU</button>
            <button className="cursor-pointer">LOCATION</button>
            <button className="cursor-pointer">ABOUT</button>
            <button className="cursor-pointer">CONTACT</button>
        </div>
        <div className="col-span-2">
            <button className="bg-red-600 ml-25 mt-7 pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer text-white">Login</button>
        </div>
      </nav>
    </div>
}