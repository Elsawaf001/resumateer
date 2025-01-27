import Image from "next/image";
import logoImage from "@/assets/images/logo.svg"
import Logo from "@/components/Logo";

const footerLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/conditions", label: "Terms & Conditions" },
    { href: "/refund", label: "Refund Policy" },

];

export default function Footer() {
    return (
        <section className="py-16">
            <div className="container">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                        <div>
                           <Logo/>
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
