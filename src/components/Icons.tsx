import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faArrowLeft,
   faHome,
   faComment,
   faCartShopping,
   faCirclePlus,
   faPaperPlane
} from '@fortawesome/free-solid-svg-icons'

export const ArrowLeftIcon = () => <FontAwesomeIcon icon={faArrowLeft} />
export const CommentIcon = () => <FontAwesomeIcon icon={faComment} style={{ color: '#FFFFFF' }} />
export const HomeIcon = () => <FontAwesomeIcon icon={faHome} style={{ color: '#FFFFFF' }} />
export const CartIcon = () => <FontAwesomeIcon icon={faCartShopping} style={{ color: '#FFFFFF' }} />
export const CirclePlusIcon = () => <FontAwesomeIcon icon={faCirclePlus} style={{ color: '#C51605', height: "1.5rem" }} />
export const PaperPlaneIcon = () => <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#FFFFFF' }} />
