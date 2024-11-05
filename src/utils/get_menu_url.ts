import qrConfig from "@/config/qr";

export default function getMenuUrl(tableNumber: string) {
    return `${qrConfig.MENU_BASE_URL}/menu?table=${tableNumber}`
}