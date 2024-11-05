import localizeConfig from "@/config/localization";

export default function localizeNumber(num: number) {
    return num.toLocaleString(localizeConfig.numberFormat);
}