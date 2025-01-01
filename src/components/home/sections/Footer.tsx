import Image from "next/image";
import logoImage from "@/assets/images/logo.svg"

const footerLinks = [
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
    return (
        <section className="py-16">
            <div className="container">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                        <div>
                            <Image src={logoImage} alt={"Logo Image"} />
                        </div>


                        <div className="">
                                <nav className="flex gap-6">
                                      {footerLinks.map((link) => (
                                           <a href={link.href} key={link.label} className="text-white/50 text-sm">{link.label}</a>
                                       ))}
                                </nav>
                        </div>

                    </div>
            </div>
        </section>
    );
}
