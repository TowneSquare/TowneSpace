const HelpCenter = () => (
    <div className="flex flex-col md:flex-row gap-3 md:gap-12 items-center">
        {Links.map((link, index) => (
            <a href={link.href} target="blank">
                <span className="font-semibold text-primary-default">
                    {link.label}
                </span>
            </a>
        ))}
    </div>
)

const Links = [
    {
       href: "",
       label: "Help Center"
    },
 ]

 export default HelpCenter;