import type { ClassificationInterface } from "../interface/ClassificationInterface";
import Bette from "../assets/Bette.jpeg";
import Gotu from "../assets/Gotu.jpg";
import Kole from "../assets/Kole.jpg";

export const ClassificationData: ClassificationInterface[] = [
    {
        nameClass: "Bette",
        gradeClass: "A",
        description: "Pinang Utuh Bulat",
        image: Bette
    },
    {
        nameClass: "Gotu",
        gradeClass: "B",
        description: "Pinang Utuh Namun Memiliki Serabut atau sedikit Pecah",
        image: Gotu
    },
    {
        nameClass: "Kole",
        gradeClass: "C",
        description: "Pinang Pecah - Pecah dan Membusuk",
        image: Kole
    }

]