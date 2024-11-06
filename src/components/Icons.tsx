import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faArrowLeft,
   faHome,
   faComment,
   faCartShopping,
   faCirclePlus,
   faPaperPlane,
   faTrashAlt,
   faLocationDot,
   faPenToSquare,
   faMoneyBillWaveAlt,
   faCircleMinus,
   faCartPlus,
   faCheckCircle,
   faTimesCircle,
   faPrint
} from '@fortawesome/free-solid-svg-icons'

export const ArrowLeftIcon = () => <FontAwesomeIcon icon={faArrowLeft} />
export const CommentIcon = () => <FontAwesomeIcon icon={faComment} style={{ color: '#FFFFFF' }} />
export const HomeIcon = () => <FontAwesomeIcon icon={faHome} style={{ color: '#FFFFFF' }} />
export const CartIcon = () => <FontAwesomeIcon icon={faCartShopping} style={{ color: '#FFFFFF' }} />
export const TrashIcon = () => <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#FFFFFF', height: ".7rem" }} />
export const TrashIconRed = () => <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#C51605', height: "1rem" }} />
export const PrintIcon = () => <FontAwesomeIcon icon={faPrint} style={{ color: '#1EC524', height: "1rem" }} />
export const CirclePlusIcon = () => <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#C51605', height: "1.5rem" }} />
export const CirclePlusSMIcon = () => <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#C51605', height: "1rem" }} />
export const CircleMinusSMIcon = () => <FontAwesomeIcon icon={faCircleMinus} style={{ color: '#C51605', height: "1rem" }} />
export const PaperPlaneIcon = () => <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#FFFFFF' }} />
export const LocationDotIcon = () => <FontAwesomeIcon icon={faLocationDot} style={{ color: '#FFB534' }} />
export const EditIcon = () => <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#FFB534' }} />
export const AddToCartIcon = () => <FontAwesomeIcon icon={faCartPlus} style={{ color: '#C51605' }} />
export const MoneyIcon = () => <FontAwesomeIcon icon={faMoneyBillWaveAlt} style={{ color: '#65B741' }} />
export const CheckMarkIcon = () => <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#65B741' }} />
export const TimesIcon = () => <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#C51605' }} />
