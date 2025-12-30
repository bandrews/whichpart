import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const TierFilterContext = createContext({
	showPreferred: true,
	setShowPreferred: () => {},
});

export function TierFilterProvider({ children }) {
	const [showPreferred, setShowPreferred] = useState(true);

	return (
		<TierFilterContext.Provider value={{ showPreferred, setShowPreferred }}>
			{children}
		</TierFilterContext.Provider>
	);
}

export function useTierFilter() {
	return useContext(TierFilterContext);
}
