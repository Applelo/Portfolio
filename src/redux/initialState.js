export default {
    language: typeof window !== 'undefined' && (window.navigator.language === "fr-FR" || window.navigator.language === "fr") ? "fr" : "en"
}