import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Classes, AnchorButton } from "@blueprintjs/core";

import { PTClasses } from "utils/common";
import { externalLink } from "utils/constants";

import Panel, { PanelProps } from "./Panel";
import styles from "./Home.module.scss";

export interface HomeProps {
  title: string;
  year: string;
  description: string;
}

const panels: PanelProps[] = [{
  year: "1988",
  title: "Thành lập",
  image: "static/about/1988.jpg",
  description: "Cửa hàng cà phê nhỏ đầu tiên được thành lập tại vùng Tứ Giác Long Xuyên",
}, {
  year: "1993",
  title: "Máy rang đầu tiên",
  image: "static/about/1993.jpg",
  description: "Những ngày đầu ấp ủ giấc mơ của những gói cà phê mang đến ly cà phê chất lượng tuyệt hảo",
}, {
  year: "1998",
  title: "Mở rộng",
  image: "static/about/1998.jpg",
  description: "Quy mô kho chứa được mở rộng, cập nhật kỹ thuật rang mới, gia tăng về số lượng máy rang",
}, {
  year: "1999",
  title: "Tăng trưởng",
  image: "static/about/1999.jpg",
  description: "Đạt mốc 10 chi nhánh - đại lí phân phối sỉ và lẻ cà phê rang Phát Thành trên khắp miền Tây",
}, {
  year: "2008",
  title: "Thương hiệu độc quyền",
  image: "static/about/2008.png",
  description: "Thương hiệu Phát Thành được bảo hộ bởi Cục Sở hữu trí tuệ Việt Nam",
}, {
  year: "2010",
  title: "Tây Nam Bộ",
  image: "static/about/2010.jpg",
  description: "Đánh dấu thời kỳ tăng trưởng mạnh mẽ của Phát Thành tại khu vực Tây Nam Bộ",
}, {
  year: "2017",
  title: "Đông Nam Bộ",
  image: "static/about/2017.jpg",
  description: "Cửa hàng đầu tiên tại TP. Hồ Chí Minh được thành lập đánh dấu mục tiêu mở rộng thị trường Đông Nam Bộ",
}, {
  year: "2018+",
  title: "E-commerce",
  image: "static/about/2018.png",
  description: "Tầm nhìn thay đổi theo hướng phát triển bền vững, định hướng xây dựng website bán hàng chuyên nghiệp",
}]

const Home: React.FC = () => {
  return (
    <div className={`${styles.main} ${Classes.TEXT_LARGE} ${Classes.RUNNING_TEXT}`}>
      <h2 className={styles.heading}><mark>Câu chuyện</mark> của&nbsp;chúng&nbsp;tôi</h2>
      <div className={styles.sub}>Phát Thành được thành lập vào năm 1988 tại Đồng Tháp, miền Tây Nam Bộ Việt Nam. Khởi sự kinh doanh tại một vùng đất không phải là thế mạnh về hạt cà phê Việt Nam, nhưng với niềm đam mê mãnh liệt đối với hạt cà phê Việt Nam, chúng tôi đã nỗ lực tìm kiếm nguồn nguyên liệu chất lượng tại Tây Nguyên và vận chuyển về Đồng Tháp chế biến.</div>

      <div className={styles.grid}>
        <div className={styles.col}>
          <p>Chúng tôi tin tưởng và nhìn thấy được tiềm năng của thị trường ở đây, khách hàng rất cần một nhà rang xay cà phê chất lượng và uy tín. Phát Thành ra đời và phát triển trong suốt 30 năm, với không ít khó khăn và thử thách, để hôm nay trở thành một trong những thương hiệu cà phê uy tín và chất lượng tại khu vực miền Tây.</p>
          <p>Không ngừng học hỏi và vươn lên để hội nhập cùng với nền kinh tế thị trường và mở cửa của thế giới, Phát Thành luôn cải tiến chất lượng sản phẩm để phù hợp thị hiếu người tiêu dùng và quan tâm sâu sắc đến lợi ích khách hàng, mối quan hệ hợp tác lâu dài cùng đối tác và các nhà cung cấp.</p>
          <p>Thành tựu đạt được trong suốt thời gian hoạt động của Phát Thành là xây dựng hệ thống đại lí phân phối tại các tỉnh thành, mở rộng quy mô kho chứa nguyên liệu và sản xuất chế biến, đội xe vận tải đáp ứng đủ giao hàng nhanh chóng và đúng hẹn.</p>
        </div>
        <div className={styles.col}>
          <p>Với tầm nhìn phát triển mới, Phát Thành nhận thấy một trong những yếu tố quan trọng để tạo nên giá trị phát triển bền vững là tham gia đóng góp nhiều hơn nữa vào giá trị của ngành hàng cà phê Việt Nam, chung tay cùng người nông dân đưa ra những sản phẩm đạt tiêu chuẩn và chất lượng đến người tiêu dùng, tối ưu hoá quy trình sản xuất để hướng đến bảo vệ môi trường, cùng với tham vọng xây dựng hệ sinh thái vững mạnh và lâu dài.</p>
          <p>Chúng tôi đang tiến hành những dự án hợp tác cùng với các tổ chức cà phê thế giới, dự án phát triển cà phê bền vững của chính phủ và thế giới để có thể tích cực đóng góp và mang đến giá trị thực sự cho người nông dân, đối tác và khách hàng.</p>
          <div className={styles.badges}><img alt="GCP" src="/static/about/gcp.png" /> <img alt="SCA" src="/static/about/sca.png" /></div>
        </div>
      </div>

      {panels.map(panel => <div key={panel.year} className={styles.panel}><Panel {...panel} /></div>)}

      <div className={styles.cta}>
        <AnchorButton href={externalLink.PARTNERSHIP} className={PTClasses.CallToAction} minimal rightIcon={IconNames.SHARE} large text="Hợp tác ngay hôm nay" />
      </div>

      <h2 className={styles.heading}>Chúng tôi là <mark>nhà&nbsp;rang&nbsp;xay</mark></h2>
      <div className={styles.sub}>
        Với kinh nghiệm hơn 30 năm lắng nghe tiếng nổ hạt cà phê, chúng tôi tự tin mang đến trải nghiệm sản phẩm tuyệt vời nhất cho khách hàng, sự đồng nhất về chất lượng, đánh thức trọn vẹn hương thơm  và mùi vị đặc trưng của hạt cà phê. Chắc chắn sẽ làm hài lòng tất cả các thực khách khó tính. Chúng tôi làm việc chăm chỉ với đam mê mãnh liệt cho giấc mơ không ngừng gia tăng giá trị cho hạt cà phê Việt Nam, mang đến sự tự hào và tình yêu trong từng sản phẩm.
      </div>

      <div className={styles.cta}>
        <AnchorButton href={externalLink.PARTNERSHIP} className={PTClasses.CallToAction} minimal rightIcon={IconNames.SHARE} large text="Hợp tác ngay hôm nay" />
      </div>

      <h2 className={styles.heading}><mark>Uy&nbsp;tín</mark>, <mark>Chất&nbsp;lượng</mark>, <mark>Bền&nbsp;vững</mark></h2>
      <div className={styles.sub}>
        <p><mark>Chúng tôi tin tưởng mạnh mẽ vào sự phát triển bền vững của ngành cà phê Việt Nam, từ nguồn nguyên liệu đến chế biến rang xay. Đối với chúng tôi, điều đó còn quan trọng hơn cả một ly cà phê ngon.</mark></p>
        <p>Cà phê Phát Thành không chỉ đem trọn hương vị gói gọn vào từng sản phẩm, mà còn mang giá trị xã hội thực sự. Đó là cam kết mạnh mẽ của chúng tôi đối với cộng đồng: phát triển kinh tế cùng với chú trọng đạo đức kinh doanh, đóng góp xây dựng cuộc sống tốt đẹp cho người nông dân, chung tay bảo vệ môi trường và vùng đất cà phê Việt Nam.</p>
        <p>Uy tín là trách nhiệm tạo nên chất lượng. Chất lượng là hạt cà phê hướng đến đóng góp sự bền vững. Sự bền vững tạo nên uy tín lâu dài.</p>
      </div>

      <div className={styles.cta}>
        <AnchorButton href={externalLink.PARTNERSHIP} className={PTClasses.CallToAction} rightIcon={IconNames.SHARE} large text="Hợp tác ngay hôm nay" />
      </div>
    </div>
  );
}

export default Home;
