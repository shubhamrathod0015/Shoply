const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t mt-16">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Shoply. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;