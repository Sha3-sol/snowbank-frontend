import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";
import DocsIcon from "../../../assets/icons/docs.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://twitter.com/fortknoxdao" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.com/invite/Ue7zPW6DVB" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>

      <Link
        href="https://medium.com/@fortknoxdao/fort-knox-dao-73e974cf326f"
        target="_blank"
      >
        <img alt="" src={DocsIcon} />
      </Link>
    </div>
  );
}
