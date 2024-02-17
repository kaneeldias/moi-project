import {NextRequest, NextResponse} from "next/server";
import {$Enums, PrismaClient} from '@prisma/client'
import QuestionType = $Enums.QuestionType;
import {prisma} from "@/utils/prisma-utils";

// export async function GET(request: NextRequest) {
//     await prisma.surveyResponse.create({
//         data: {
//             applicationId: 1,
//             initialCount: 10,
//             finalCount: 20,
//             answers: {
//                 create: [
//                     {
//                         questionId: 1,
//                         type: QuestionType.INITIAL,
//                         answer: 5.4
//                     },
//                     {
//                         questionId: 2,
//                         type: QuestionType.FINAL,
//                         answer: 5.4
//                     }
//                 ]
//
//             }
//         }
//     });
//
//     const surveyResponses = await prisma.surveyResponse.findMany({
//         include: {
//             answers: true
//         }
//     });
//     return NextResponse.json(surveyResponses);
// }
