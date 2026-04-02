import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCouch,
  faMoneyBillWave,
  faMugHot,
  faTv,
  faBox,
  faUtensils,
  faMusic,
  faGasPump,
  faRightToBracket,
  faCreditCard,
  faChevronLeft,
  faCheckCircle,
  faClock,
  faShieldHalved,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { Transaction } from "../types/transaction";
import { formatFullDate } from "../utils/dateFormatting";
import { getIconColor } from "../utils/iconColors";
import { formatAmountLarge } from "../utils/formatAmount";

library.add(
  faCouch,
  faMoneyBillWave,
  faMugHot,
  faTv,
  faBox,
  faUtensils,
  faMusic,
  faGasPump,
  faRightToBracket,
  faCreditCard,
  faChevronLeft,
  faCheckCircle,
  faClock,
  faShieldHalved,
  faReceipt,
);

function getIcon(tx: Transaction) {
  if (tx.iconLib === "brands" && tx.icon === "apple") {
    return <FontAwesomeIcon icon={faApple} />;
  }
  const iconMap: Record<string, typeof faCouch> = {
    couch: faCouch,
    "money-bill-wave": faMoneyBillWave,
    "mug-hot": faMugHot,
    tv: faTv,
    box: faBox,
    utensils: faUtensils,
    music: faMusic,
    "gas-pump": faGasPump,
    "right-to-bracket": faRightToBracket,
  };
  const icon = iconMap[tx.icon] || faCreditCard;
  return <FontAwesomeIcon icon={icon} />;
}

interface Props {
  transaction: Transaction;
  onBack: () => void;
}

export default function TransactionDetail({ transaction: tx, onBack }: Props) {
  const color = getIconColor(tx.id);
  const amountStr = formatAmountLarge(tx.amount, tx.type);
  const fullDate = formatFullDate(tx.date);
  const isPositive = tx.type === "Payment";

  return (
    <div className="screen detail-screen">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="back-btn" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="detail-topbar-title">Transaction</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Hero amount section */}
      <div className="detail-hero">
        <div className="detail-icon-wrap" style={{ background: color }}>
          {getIcon(tx)}
        </div>
        <div
          className={`detail-amount ${isPositive ? "amount-positive" : "amount-negative"}`}
        >
          {amountStr}
        </div>
        <div className="detail-name">{tx.name}</div>
        <div className="detail-date">{fullDate}</div>
        {tx.authorizedUser && (
          <div className="detail-user-badge">
            <span>👤 {tx.authorizedUser}</span>
          </div>
        )}
      </div>

      {/* Status card */}
      <div className="detail-card">
        <div className="detail-card-row">
          <div className="detail-card-row-left">
            <FontAwesomeIcon
              icon={tx.isPending ? faClock : faCheckCircle}
              className={`detail-status-icon ${tx.isPending ? "status-pending" : "status-approved"}`}
            />
            <span className="detail-card-label">Status</span>
          </div>
          <span
            className={`detail-status-badge ${tx.isPending ? "badge-pending" : "badge-approved"}`}
          >
            {tx.isPending ? "Pending" : "Approved"}
          </span>
        </div>

        <div className="detail-divider" />

        <div className="detail-card-row">
          <div className="detail-card-row-left">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="detail-card-icon-sm"
            />
            <span className="detail-card-label">Card</span>
          </div>
          <span className="detail-card-value">RBC Bank Debit •••• 4821</span>
        </div>

        <div className="detail-divider" />

        <div className="detail-card-row">
          <div className="detail-card-row-left">
            <FontAwesomeIcon icon={faReceipt} className="detail-card-icon-sm" />
            <span className="detail-card-label">Type</span>
          </div>
          <span className="detail-card-value">{tx.type}</span>
        </div>

        <div className="detail-divider" />

        <div className="detail-card-row">
          <div className="detail-card-row-left">
            <FontAwesomeIcon
              icon={faShieldHalved}
              className="detail-card-icon-sm"
            />
            <span className="detail-card-label">Total</span>
          </div>
          <span
            className={`detail-total ${isPositive ? "amount-positive" : "amount-negative"}`}
          >
            {amountStr}
          </span>
        </div>
      </div>

      {/* Description block */}
      <div className="detail-desc-card">
        <div className="detail-desc-label">Description</div>
        <div className="detail-desc-text">
          {tx.isPending ? `Pending — ${tx.description}` : tx.description}
        </div>
      </div>

      {/* Transaction ID */}
      <div className="detail-txid">Transaction ID: {tx.id}</div>
    </div>
  );
}
