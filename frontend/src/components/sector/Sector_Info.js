import React from "react";

const Title = ({title}) => {
    return <div class="font-bold text-xl mb-2">{title}</div>
};

const Info = ({msg}) => {
    return <div class="font-bold text-lg mb-2">{msg}</div>
};

const Sector_Info = () => {
    return(
        <div class="flex-auto m-auto">            
            <Title title="업종 알아보기" />
            <div class="mt-5">
                <Info msg="내가 투자한 기업은 어떤 업종에 속하는지" />
                <Info msg="업종내 시가총액 순위와 주식 가격의 순위를 확인해보세요." />
            </div>
        </div>
    );
};

export default Sector_Info;