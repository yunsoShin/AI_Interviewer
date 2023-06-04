import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a job interviewer",
      },
      {
        role: "user",
        content: `{
          text: '\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '1\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '주도적이고 항상 소통하는 개발자입니다\n' +
            ' Contact\n' +
            ' Email :   qwaszx5053@naver.com\n' +
            'GitHub :  https://github.com/yunsoShin\n' +
            'Study Blog : https://yunsoo1.tistory.com\n' +
            'Phone :  010-6769-5053\n' +
            ' 학력\n' +
            '재학기간구분학교명(소재지)전공학점\n' +
            '2018.03 ~\n' +
            '2022.03\n' +
            '졸업\n' +
            '폴리텍 성남캠퍼\n' +
            '스대학 (경기)\n' +
            '전자정보통신과3.7 / 4.5\n' +
            '기간구분기관/장소내용\n' +
            '2022.01 ~\n' +
            '2022.03\n' +
            '교육이수내역\n' +
            'Dream Coding\n' +
            'Academy\n' +
            '프론트엔드 필수 브라우저 101\n' +
            '수료\n' +
            '자격증/어학/수상내역\n' +
            '취득일/수상일구분자격/어학/수상명발행처/기관/언어합격/점수\n' +
            '2018.10수상내역/공모전\n' +
            '전자회로설계,제\n' +
            '작 및 제어측정 경\n' +
            '진대회 장려상\n' +
            '한국폴리텍대학-\n' +
            '2019.03자격증/면허증1종보통운전면허\n' +
            '경찰청(운전면허\n' +
            '시험관리단)\n' +
            '최종합격\n' +
            '2022.06자격증/면허증정보통신산업기사한국산업인력공단최종합격\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '2\n' +
            '\x00Introduction\n' +
            '주도적인 개발,주도적인 해결을 지향합니다\n' +
            '저는 동업자 1명과 함께 투룸 사무실을 빌려 숙식을 하며 7개월간에 개인사업체 2\n' +
            '개를 직접 일궈본 경험이 있습니다 \n' +
            '기존의 통신판매업에서 더욱 발전시켜 python크롤링을 이용해 더  좋은 상품을 찾\n' +
            '을수있는 프로그램을 개발해 일매출300만원을 달성하기도 하였습니다. \n' +
            '한편으론 아버지의 사업체의 홈페이지가 없어, 홈페이지를 자체적으로 제작,배포한 \n' +
            '경험도 있습니다\n' +
            '매출이미지\n' +
            '소통의 힘을 매우 잘 아는 개발자입니다\n' +
            '사업을 꾸려보며 클라이언트나 팀원이 정확히 무엇을 원하는지 파악하는것과 내가 \n' +
            '무엇을 할 수 있고 \n' +
            '못하는지 정확히 파악하는것은 무척 까다롭고 힘든일이지만 가장 중요한 덕목임을 \n' +
            '배웠습니다.\n' +
            ' Stack\n' +
            'HTML, CSS, JavaScript(ES6+), React.js, Next.js, firebase\n' +
            'React-query, Tailwind, Style-components\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '3\n' +
            'Portfolio\n' +
            '청북베어링상사 홈페이지 제작\n' +
            '\n' +
            '배포 URL |  cbbearing.co.kr \n' +
            'GitHub URL | https://github.com/yunsoShin/CBbearingSite \n' +
            ' \n' +
            '사용기술 | React,tailwind,React-query,cloudinary,firebase\n' +
            '복잡한 상태관리를 위해 Context API를 활용한 상태관리 \n' +
            'React-query hook인 useMutation을 이용해 상품추가함수 실행시 최신데이터로 업데\n' +
            '이트될 수 있도록 함\n' +
            '쿼리된 데이터를 1분단위로 신선하게 유지할 수 있도록 리팩토링함 \n' +
            'firebase Authentication API 를 이용한 구글로그인인증 구현\n' +
            'cloudinary API를 활용해 상품 등록시 이미지최적화 도입\n' +
            '\n' +
            '배포 URL | https://yunsoshin.github.io/Portfolio/ \n' +
            'GitHub URL | https://github.com/yunsoShin/Portfolio \n' +
            ' \n' +
            '사용기술 | JavaScript,HTML,CSS\n' +
            '간단한 반응형 웹페이지 제작\n' +
            '반응형 웹페이지로 사용자인터페이스 환경을 고려한 제작\n' +
            'BEM구조를 신경써서 만들었습니다\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '4'
        }
        - wait compiling...
        - event compiled successfully in 41 ms (37 modules)
        - wait compiling /api/convert (client and server)...
        - event compiled successfully in 24 ms (49 modules)
        - wait compiling /api/chatgpt (client and server)...
        - event compiled successfully in 74 ms (51 modules)
        {
          text: '\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '1\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '주도적이고 항상 소통하는 개발자입니다\n' +
            ' Contact\n' +
            ' Email :   qwaszx5053@naver.com\n' +
            'GitHub :  https://github.com/yunsoShin\n' +
            'Study Blog : https://yunsoo1.tistory.com\n' +
            'Phone :  010-6769-5053\n' +
            ' 학력\n' +
            '재학기간구분학교명(소재지)전공학점\n' +
            '2018.03 ~\n' +
            '2022.03\n' +
            '졸업\n' +
            '폴리텍 성남캠퍼\n' +
            '스대학 (경기)\n' +
            '전자정보통신과3.7 / 4.5\n' +
            '기간구분기관/장소내용\n' +
            '2022.01 ~\n' +
            '2022.03\n' +
            '교육이수내역\n' +
            'Dream Coding\n' +
            'Academy\n' +
            '프론트엔드 필수 브라우저 101\n' +
            '수료\n' +
            '자격증/어학/수상내역\n' +
            '취득일/수상일구분자격/어학/수상명발행처/기관/언어합격/점수\n' +
            '2018.10수상내역/공모전\n' +
            '전자회로설계,제\n' +
            '작 및 제어측정 경\n' +
            '진대회 장려상\n' +
            '한국폴리텍대학-\n' +
            '2019.03자격증/면허증1종보통운전면허\n' +
            '경찰청(운전면허\n' +
            '시험관리단)\n' +
            '최종합격\n' +
            '2022.06자격증/면허증정보통신산업기사한국산업인력공단최종합격\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '2\n' +
            '\x00Introduction\n' +
            '주도적인 개발,주도적인 해결을 지향합니다\n' +
            '저는 동업자 1명과 함께 투룸 사무실을 빌려 숙식을 하며 7개월간에 개인사업체 2\n' +
            '개를 직접 일궈본 경험이 있습니다 \n' +
            '기존의 통신판매업에서 더욱 발전시켜 python크롤링을 이용해 더  좋은 상품을 찾\n' +
            '을수있는 프로그램을 개발해 일매출300만원을 달성하기도 하였습니다. \n' +
            '한편으론 아버지의 사업체의 홈페이지가 없어, 홈페이지를 자체적으로 제작,배포한 \n' +
            '경험도 있습니다\n' +
            '매출이미지\n' +
            '소통의 힘을 매우 잘 아는 개발자입니다\n' +
            '사업을 꾸려보며 클라이언트나 팀원이 정확히 무엇을 원하는지 파악하는것과 내가 \n' +
            '무엇을 할 수 있고 \n' +
            '못하는지 정확히 파악하는것은 무척 까다롭고 힘든일이지만 가장 중요한 덕목임을 \n' +
            '배웠습니다.\n' +
            ' Stack\n' +
            'HTML, CSS, JavaScript(ES6+), React.js, Next.js, firebase\n' +
            'React-query, Tailwind, Style-components\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '3\n' +
            'Portfolio\n' +
            '청북베어링상사 홈페이지 제작\n' +
            '\n' +
            '배포 URL |  cbbearing.co.kr \n' +
            'GitHub URL | https://github.com/yunsoShin/CBbearingSite \n' +
            ' \n' +
            '사용기술 | React,tailwind,React-query,cloudinary,firebase\n' +
            '복잡한 상태관리를 위해 Context API를 활용한 상태관리 \n' +
            'React-query hook인 useMutation을 이용해 상품추가함수 실행시 최신데이터로 업데\n' +
            '이트될 수 있도록 함\n' +
            '쿼리된 데이터를 1분단위로 신선하게 유지할 수 있도록 리팩토링함 \n' +
            'firebase Authentication API 를 이용한 구글로그인인증 구현\n' +
            'cloudinary API를 활용해 상품 등록시 이미지최적화 도입\n' +
            '\n' +
            '배포 URL | https://yunsoshin.github.io/Portfolio/ \n' +
            'GitHub URL | https://github.com/yunsoShin/Portfolio \n' +
            ' \n' +
            '사용기술 | JavaScript,HTML,CSS\n' +
            '간단한 반응형 웹페이지 제작\n' +
            '반응형 웹페이지로 사용자인터페이스 환경을 고려한 제작\n' +
            'BEM구조를 신경써서 만들었습니다\n' +
            '\n' +
            '신윤수 | 신입 프론트엔드 개발자\n' +
            '4'
        } 이 이력서를 바탕으로 채용면접시 예상되는 기술적인 질문 3가지와 포트폴리오기반의 기술적인 질문 2개를 작성해줘`,
      },
    ],
  });

  const result =
    response.data.choices[0].message || "sorry, there was a problem";
  res.status(200).json(result);
}
