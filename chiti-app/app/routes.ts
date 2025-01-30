import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	// index("routes/identity-dashboard/index.tsx"),
	index("routes/identity-creation/index.tsx"),
	// route("/identity-creation", "routes/identity-creation/index.tsx"),
] satisfies RouteConfig;
