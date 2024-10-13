const websocketConfig = {
    baseUrl: import.meta.env.VITE_API_URL,
    menuRecommendation: {
        on: "menu_recommendation_response",
        emit: "menu_recommendation"
    }
}

export default websocketConfig;