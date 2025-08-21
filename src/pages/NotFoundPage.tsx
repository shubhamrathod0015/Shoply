import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
            <Link href="/">
                <Button className="mt-8">Go Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;