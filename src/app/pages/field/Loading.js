import loading_page from "@/public/Image/loading_image.png";
import Image from "next/image";

export default function FieldPage() {
    return <>
        
            <Image
                src={loading_page}
                alt="Glass"
                layout="fill"
                objectFit="fill"
                style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
            />
        </>
}
