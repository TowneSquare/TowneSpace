const FollowUs = () => {
    return (
        <div className="flex gap-6 items-center">
            <a
                href={`https://twitter.com/townespacexyz`}
                target="_blank"
                className="w-6"
            >
                <img src="/follow/twitter.svg" alt="X" className="w-9 md:w-[54px]" />
            </a>
            <a
                href={`https://discord.gg/bK5p9tNM4d`}
                target="_blank"
                className="w-8"
            >
                <img src="/follow/discord.svg" alt="discord" className="w-9 md:w-[54px]" />
            </a>
        </div>
    );
};

export default FollowUs;
