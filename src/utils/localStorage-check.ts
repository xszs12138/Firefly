export function canUseLocalStorage(): boolean {
	return (
		typeof localStorage !== "undefined" &&
		typeof localStorage.setItem === "function"
	);
}
