import { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Layout from "./layout";
import { useParams } from "react-router-dom";
import { useCoursesContext } from "../context/courses_context";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { Oval } from "react-loader-spinner";
import parse from "html-react-parser";

const PricingOption = ({ pricing, isChecked, onToggle, dark }) => (
  <label
    className={`group flex cursor-pointer items-start gap-3 px-3 py-3 transition-colors duration-150 ${
      dark
        ? isChecked
          ? "bg-white/10"
          : "hover:bg-white/5"
        : isChecked
          ? "bg-[#fff4ef]"
          : "hover:bg-stone-50"
    }`}
  >
    <span
      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors ${
        dark
          ? isChecked
            ? "border-[#f0a28a] bg-[#e8735a] text-white"
            : "border-white/35 bg-transparent text-transparent"
          : isChecked
            ? "border-[#e8735a] bg-[#e8735a] text-white"
            : "border-stone-300 bg-white text-transparent"
      }`}
    >
      <CheckIcon className="h-3 w-3" strokeWidth={3} />
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={onToggle}
      />
    </span>
    <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
      <span
        className={`text-[13px] leading-snug ${
          dark
            ? isChecked
              ? "font-medium text-white"
              : "text-white/75"
            : isChecked
              ? "font-medium text-stone-900"
              : "text-stone-600"
        }`}
      >
        {pricing.sessionType}
      </span>
      <span
        className={`shrink-0 text-[13px] tabular-nums ${
          dark ? "font-semibold text-[#f0a28a]" : "font-semibold text-stone-900"
        }`}
      >
        ${pricing.price}
      </span>
    </span>
  </label>
);

const ContentSection = ({ index, label, children }) => (
  <section className="grid grid-cols-[auto_1fr] gap-4 border-b border-stone-200/80 py-7 last:border-b-0 sm:gap-6 sm:py-9">
    <span className="pt-1 font-mono text-xs font-medium tracking-widest text-[#e8735a]">
      {String(index).padStart(2, "0")}
    </span>
    <div>
      <h2 className="mb-3 text-base font-semibold tracking-tight text-[#1b2a41] sm:text-lg">
        {label}
      </h2>
      <div className="max-w-none text-[15px] leading-relaxed text-stone-600 [&_li]:my-1.5 [&_p]:mb-3 [&_ul]:my-2">
        {children}
      </div>
    </div>
  </section>
);

const PricingGroup = ({ title, dark, children }) => (
  <div>
    <div
      className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${
        dark ? "bg-white/5 text-[#f0a28a]" : "bg-stone-100 text-stone-500"
      }`}
    >
      {title}
    </div>
    <div
      className={`divide-y ${dark ? "divide-white/10" : "divide-stone-100"}`}
    >
      {children}
    </div>
  </div>
);

const PriceSummary = ({ totalPrice, selectedCount, dark }) => (
  <div className={dark ? "text-left" : "text-center"}>
    <p
      className={`text-xs ${
        dark ? "text-white/40 line-through" : "text-stone-400 line-through"
      }`}
    >
      Was $
      {totalPrice != null && totalPrice > 0
        ? (totalPrice + selectedCount * 49).toFixed(2)
        : "00.00"}
    </p>
    <p
      className={`mt-1 text-4xl font-bold tracking-tight tabular-nums ${
        dark ? "text-white" : "text-[#1b2a41]"
      }`}
    >
      ${totalPrice != null && totalPrice > 0 ? totalPrice.toFixed(2) : "00.00"}
    </p>
    <p
      className={`mt-2 text-xs font-medium ${
        dark ? "text-[#f0a28a]" : "text-[#c45d45]"
      }`}
    >
      You save ${selectedCount * 49}
    </p>
  </div>
);

const AddToCartButton = ({
  disabled,
  courseID,
  imageSrc,
  title,
  instructor,
  price,
  selectedPricings,
  addToCart,
}) => (
  <Link
    to={disabled ? "#" : "/cart"}
    className={`mt-5 flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
      disabled
        ? "cursor-not-allowed bg-stone-300 text-stone-500 pointer-events-none"
        : "bg-[#e8735a] text-white hover:bg-[#d9664e] focus:outline-none focus:ring-2 focus:ring-[#e8735a] focus:ring-offset-2"
    }`}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      addToCart(courseID, imageSrc, title, instructor, price, selectedPricings);
    }}
  >
    <ShoppingCartIcon className="h-5 w-5" />
    Add to Cart
  </Link>
);

const SingleTrainingDetail = () => {
  const { id } = useParams();
  const { fetchSingleCourse, single_course } = useCoursesContext();
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [selectedPricings, setSelectedPricings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSingleCourse(id);
      setLoading(false);
    };
    fetchData();
  }, [id, fetchSingleCourse]);

  useEffect(() => {
    if (single_course?.Pricings?.length) {
      const isPastWebinar = new Date(single_course.webinarDate) < new Date();

      if (isPastWebinar) {
        const accessOptions = single_course.Pricings.filter(
          (pricing) =>
            pricing.sessionType === "Recorded session" ||
            pricing.sessionType === "Transcript" ||
            pricing.sessionType === "Recorded Plus Transcript session",
        );

        if (accessOptions.length > 0) {
          setSelectedPricings([accessOptions[0]]);
        }
      } else {
        setSelectedPricings([single_course.Pricings[0]]);
      }
    }
  }, [single_course]);

  const handlePricingToggle = (pricing) => {
    setSelectedPricings((prev) => {
      const exists = prev.find((p) => p.id === pricing.id);

      if (exists) {
        return prev.filter((p) => p.id !== pricing.id);
      } else {
        return [...prev, pricing];
      }
    });
  };

  const totalPrice = selectedPricings.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#e9eef2]">
        <Oval
          height={50}
          width={50}
          color="#e8735a"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#1b2a41"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  const {
    courseID,
    title,
    instructor,
    discountedPrice,
    description,
    what_you_will_learn,
    imageSrc,
    Pricings = [],
    webinarDate,
    duration,
    areas_covered,
    who_will_benefit,
    instructor_profile,
    why_register,
    background,
  } = single_course;

  const dateTime = new Date(webinarDate);
  const webinarDateUTC = new Date(webinarDate);
  const isPastWebinar = new Date(webinarDate) < new Date();
  const accessOptions = Pricings.filter(
    (pricing) =>
      pricing.sessionType === "Recorded session" ||
      pricing.sessionType === "Transcript" ||
      pricing.sessionType === "Recorded Plus Transcript session",
  );

  const day = webinarDateUTC.getUTCDate();
  const monthYear = webinarDateUTC.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const weekday = webinarDateUTC.toLocaleString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
  const monthShort = webinarDateUTC.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const formattedTimeEST = dateTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedTimePST = dateTime.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  function convertMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (minutes <= 60) {
      return `${minutes} min`;
    }

    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} min`;
  }

  const visiblePricings = showMore
    ? Pricings.slice(0, 5)
    : Pricings.slice(0, 2);

  const cartPrice = selectedPricings.length > 0 ? totalPrice : discountedPrice;
  const cartDisabled = selectedPricings.length === 0;

  const contentBlocks = [
    description && { label: "Description", body: description },
    why_register && { label: "Why Register", body: why_register },
    what_you_will_learn && {
      label: "Why Should You Attend",
      body: what_you_will_learn,
    },
    areas_covered && {
      label: "Areas Covered in the Webinar Session",
      body: areas_covered,
    },
    who_will_benefit && { label: "Who will benefit?", body: who_will_benefit },
    instructor_profile && {
      label: "Instructor Profile",
      body: instructor_profile,
    },
    background && { label: "Background", body: background },
  ].filter(Boolean);

  const renderPurchasePanel = () => (
    <div className="overflow-hidden bg-[#1b2a41] text-white">
      <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="absolute left-0 top-0 h-full w-1 bg-[#e8735a]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
          {isPastWebinar ? "Get Access" : "Registration"}
        </p>
        <p className="mt-1 text-sm font-medium text-white/90">
          {isPastWebinar ? "On-demand materials" : "Secure your seat"}
        </p>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <PriceSummary
          totalPrice={totalPrice}
          selectedCount={selectedPricings.length}
          dark
        />
        <AddToCartButton
          disabled={cartDisabled}
          courseID={courseID}
          imageSrc={imageSrc}
          title={title}
          instructor={instructor}
          price={cartPrice}
          selectedPricings={selectedPricings}
          addToCart={addToCart}
        />

        {isPastWebinar ? (
          <PricingGroup title="Access Options" dark>
            {accessOptions.map((pricing) => {
              const isChecked = selectedPricings.some(
                (p) => p.id === pricing.id,
              );
              return (
                <PricingOption
                  key={pricing.id}
                  pricing={pricing}
                  isChecked={isChecked}
                  dark
                  onToggle={() => handlePricingToggle(pricing)}
                />
              );
            })}
          </PricingGroup>
        ) : (
          <>
            <PricingGroup title="Live Webinar" dark>
              {visiblePricings.map((pricing) => {
                const isChecked = selectedPricings.some(
                  (p) => p.id === pricing.id,
                );
                return (
                  <PricingOption
                    key={pricing.id}
                    pricing={pricing}
                    isChecked={isChecked}
                    dark
                    onToggle={() => handlePricingToggle(pricing)}
                  />
                );
              })}
            </PricingGroup>
            {Pricings.length > 2 && (
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="-mt-3 flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#f0a28a] transition-colors hover:text-white"
              >
                <span>{showMore ? "Less Attendees" : "More Attendees"}</span>
                <span
                  className={`inline-block transition-transform duration-200 ${
                    showMore ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
            )}

            <PricingGroup title="On-Demand" dark>
              {Pricings?.filter(
                (pricing) =>
                  pricing.sessionType === "Recorded session" ||
                  pricing.sessionType === "Transcript",
              ).map((pricing) => {
                const isChecked = selectedPricings.some(
                  (p) => p.id === pricing.id,
                );
                return (
                  <PricingOption
                    key={pricing.id}
                    pricing={pricing}
                    isChecked={isChecked}
                    dark
                    onToggle={() => handlePricingToggle(pricing)}
                  />
                );
              })}
            </PricingGroup>

            <PricingGroup title="Value Packs" dark>
              {Pricings?.filter(
                (pricing) =>
                  pricing.sessionType === "Live Plus Recorded session" ||
                  pricing.sessionType === "Live Plus Transcript session" ||
                  pricing.sessionType === "Recorded Plus Transcript session" ||
                  pricing.sessionType === "Group Session For 10 Attendees" ||
                  pricing.sessionType ===
                    "Group Session For More Than 10 Attendees",
              ).map((pricing) => {
                const isChecked = selectedPricings.some(
                  (p) => p.id === pricing.id,
                );
                return (
                  <PricingOption
                    key={pricing.id}
                    pricing={pricing}
                    isChecked={isChecked}
                    dark
                    onToggle={() => handlePricingToggle(pricing)}
                  />
                );
              })}
            </PricingGroup>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-[#e9eef2]">
        {/* Angled ink header */}
        <div className="relative overflow-hidden bg-[#1b2a41]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 12px)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#e8735a]/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                  isPastWebinar
                    ? "border-amber-400/40 text-amber-200"
                    : "border-[#e8735a]/50 text-[#f0a28a]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 ${
                    isPastWebinar
                      ? "bg-amber-300"
                      : "bg-[#e8735a] animate-pulse"
                  }`}
                />
                {isPastWebinar ? "On-Demand Recording" : "Live Webinar"}
              </span>
            </div>

            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <h1 className="max-w-3xl text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-[2.35rem]">
                  {title}
                </h1>
              </div>
              <div className="hidden lg:col-span-4 lg:block">
                <div className="border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center border border-white/20 px-3 py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a28a]">
                        {monthShort}
                      </span>
                      <span className="text-3xl font-bold leading-none text-white tabular-nums">
                        {day}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {weekday}
                      </p>
                      <p className="mt-0.5 text-xs text-white/55">
                        {formattedTimeEST} EST · {formattedTimePST} PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagonal cut */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10 bg-[#e9eef2]"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 pb-16 sm:-mt-8 sm:px-6 lg:px-8 lg:pb-24">
          {/* Ticket meta strip */}
          <div className="mb-8 grid grid-cols-1 overflow-hidden border border-stone-300/70 bg-white sm:mb-10 lg:grid-cols-[200px_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-auto lg:h-full lg:min-h-[200px]">
              <img
                src={imageSrc}
                alt={title || "Training"}
                className="absolute inset-0 h-full w-full object-contain object-center lg:object-cover lg:object-top"
              />
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent to-white/10 lg:block" />
            </div>

            <div className="grid grid-cols-1 divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {/* Date - mobile only (desktop in header) */}
              <div className="flex items-center gap-3 p-5 lg:hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#fff4ef] text-[#e8735a]">
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-[#1b2a41]">
                    {day} {monthYear}
                  </p>
                  <p className="text-xs text-stone-500">
                    {weekday} · {formattedTimeEST} EST
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-3 p-5 lg:flex">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#fff4ef] text-[#e8735a]">
                  <CalendarDaysIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    Schedule
                  </p>
                  <p className="text-sm font-semibold text-[#1b2a41]">
                    {weekday}, {day} {monthYear}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formattedTimeEST} EST / {formattedTimePST} PST
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#fff4ef] text-[#e8735a]">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    Created by
                  </p>
                  <p className="text-sm font-semibold text-[#1b2a41]">
                    {instructor?.replace(/"/g, "")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#fff4ef] text-[#e8735a]">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    Duration
                  </p>
                  <p className="text-sm font-semibold text-[#1b2a41]">
                    {duration ? convertMinutes(duration) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Content — open layout, no big white card */}
            <div className="lg:col-span-8">
              <div className="mb-2 flex items-baseline justify-between border-b border-[#1b2a41]/15 pb-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1b2a41]">
                  Session overview
                </h2>
                <span className="font-mono text-xs text-stone-400">
                  {contentBlocks.length} sections
                </span>
              </div>

              {contentBlocks.map((block, i) => (
                <ContentSection
                  key={block.label}
                  index={i + 1}
                  label={block.label}
                >
                  {parse(block.body)}
                </ContentSection>
              ))}
            </div>

            {/* Sticky dark purchase panel */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-6">{renderPurchasePanel()}</div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleTrainingDetail;
