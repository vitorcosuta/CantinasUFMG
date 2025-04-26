import { isAdmin, isAuthenticated } from '../api/userService';
import ForbiddenError from '../ui/pages/Errors/ForbiddenError';
import UnauthorizedError from '../ui/pages/Errors/UnauthorizedError';

export const PrivateRoute = ({ element, requireAdmin = false }) => {
    if (!isAuthenticated()) {
        return <UnauthorizedError />;
    }

    if (requireAdmin && !isAdmin()) {
        return <ForbiddenError />;
    }

    return element;
};
