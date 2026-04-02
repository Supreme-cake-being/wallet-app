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
  faChevronRight,
  faCreditCard,
  faCircle,
  faCalendarCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { Transaction } from "../types/transaction";
import { formatTransactionDate } from "../utils/dateFormatting";
import { formatPoints, getTodayPoints } from "../utils/pointsCalculation";
import { getIconColor } from "../utils/iconColors";
import { formatAmount } from "../utils/formatAmount";

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
  faChevronRight,
  faCreditCard,
  faCircle,
  faCalendarCheck,
  faStar,
);

const CARD_BALANCE = 847.23;
const MAX_LIMIT = 1500;
const AVAILABLE = MAX_LIMIT - CARD_BALANCE;

interface Props {
  transactions: Transaction[];
  onSelect: (tx: Transaction) => void;
}

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

export default function TransactionsList({ transactions, onSelect }: Props) {
  const todayPoints = getTodayPoints();
  const usedPercent = (CARD_BALANCE / MAX_LIMIT) * 100;

  return (
    <div className="screen">
      {/* Header */}
      <div className="header">
        <span className="header-greeting">Good morning 👋</span>
        <div className="avatar">JD</div>
      </div>

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-card-shine" />
        <div className="balance-card-inner">
          <div className="balance-label">Card Balance</div>
          <div className="balance-amount">${CARD_BALANCE.toFixed(2)}</div>
          <div className="balance-bar-wrap">
            <div className="balance-bar">
              <div
                className="balance-bar-fill"
                style={{ width: `${usedPercent}%` }}
              />
            </div>
          </div>
          <div className="balance-meta">
            <span className="balance-available">
              <span className="balance-available-dot" />${AVAILABLE.toFixed(2)}{" "}
              available
            </span>
            <span className="balance-limit">of ${MAX_LIMIT.toFixed(0)}</span>
          </div>
          <div className="balance-card-number">•••• •••• •••• 4821</div>
        </div>
      </div>

      {/* Info Row */}
      <div className="info-row">
        {/* No Payment Due */}
        <div className="info-card">
          <div className="info-card-icon" style={{ background: "#e8f5e9" }}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              style={{ color: "#2e7d32" }}
            />
          </div>
          <div className="info-card-text">
            <div className="info-card-label">Payment</div>
            <div className="info-card-value">All Clear ✓</div>
          </div>
          <div className="info-card-sub">
            You've paid your September balance.
          </div>
        </div>

        {/* Daily Points */}
        <div className="info-card">
          <div className="info-card-icon" style={{ background: "#fff8e1" }}>
            <FontAwesomeIcon icon={faStar} style={{ color: "#f9a825" }} />
          </div>
          <div className="info-card-text">
            <div className="info-card-label">Today's Points</div>
            <div className="info-card-value points-value">
              {formatPoints(todayPoints)}
            </div>
          </div>
          <div className="info-card-sub">pts earned today</div>
        </div>
      </div>

      {/* Transactions */}
      <div className="section-header">
        <span className="section-title">Latest Transactions</span>
        <span className="section-link">See all</span>
      </div>

      <div className="transactions-list">
        {transactions.map((tx, i) => {
          const color = getIconColor(tx.id);
          const dateStr = formatTransactionDate(tx.date);
          const amountStr = formatAmount(tx.amount, tx.type);
          const isPositive = tx.type === "Payment";

          let descDisplay = tx.description;
          if (tx.isPending) descDisplay = `Pending — ${descDisplay}`;

          let metaLine = dateStr;
          if (tx.authorizedUser) metaLine = `${tx.authorizedUser} · ${dateStr}`;

          return (
            <div
              key={tx.id}
              className="tx-item"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => onSelect(tx)}
            >
              <div className="tx-icon-wrap" style={{ background: color }}>
                {getIcon(tx)}
              </div>
              <div className="tx-body">
                <div className="tx-name">{tx.name}</div>
                <div className="tx-desc">{descDisplay}</div>
                <div className="tx-meta">{metaLine}</div>
              </div>
              <div className="tx-right">
                <div
                  className={`tx-amount ${isPositive ? "amount-positive" : "amount-negative"}`}
                >
                  {amountStr}
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="tx-chevron" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
