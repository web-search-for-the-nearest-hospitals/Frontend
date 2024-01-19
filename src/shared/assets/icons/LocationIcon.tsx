interface ILocationIcon {
  size?: number;
}
export default function LocationIcon({ size = 30 }: ILocationIcon) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.6431 10.7143C24.6431 16.05 15.0003 28.9286 15.0003 28.9286C15.0003 28.9286 5.35742 16.05 5.35742 10.7143C5.35742 8.15685 6.37336 5.70416 8.18175 3.89577C9.99014 2.08738 12.4428 1.07144 15.0003 1.07144C17.5577 1.07144 20.0104 2.08738 21.8188 3.89577C23.6272 5.70416 24.6431 8.15685 24.6431 10.7143Z"
        stroke="#695FEB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9994 13.9286C16.7746 13.9286 18.2137 12.4895 18.2137 10.7143C18.2137 8.93908 16.7746 7.5 14.9994 7.5C13.2242 7.5 11.7852 8.93908 11.7852 10.7143C11.7852 12.4895 13.2242 13.9286 14.9994 13.9286Z"
        stroke="#695FEB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
