export type IconType = '@calendar' | 'csr' | 'search';

interface Props {
  type: IconType;
  className?: string;
}

export default function Icon({ type, className }: Props) {
  if (type === 'search')
    return (
      <svg fill="none" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          clipRule="evenodd"
          d="M1.43964 10.9422C1.43964 5.3133 6.00059 0.75 11.627 0.75C17.2535 0.75 21.8144 5.3133 21.8144 10.9422C21.8144 12.9276 21.2467 14.7811 20.2648 16.3482C20.4132 16.4717 20.5612 16.5945 20.7091 16.7171L20.7147 16.7218C21.5317 17.3995 22.3427 18.0722 23.1437 18.815C24.1053 19.7067 24.2379 21.0936 23.3035 22.0602C23.2178 22.1488 23.1265 22.2417 23.0292 22.3391C22.932 22.4364 22.8391 22.5278 22.7506 22.6135C21.7846 23.5488 20.3983 23.4159 19.5072 22.4536C18.7649 21.6521 18.0927 20.8405 17.4156 20.0229L17.4124 20.0191L17.4114 20.0179C17.2894 19.8706 17.1673 19.7231 17.0444 19.5753C15.4751 20.563 13.6174 21.1344 11.627 21.1344C6.00059 21.1344 1.43964 16.5711 1.43964 10.9422ZM11.6896 17.5C15.2795 17.5 18.1896 14.5898 18.1896 11C18.1896 7.41015 15.2795 4.5 11.6896 4.5C8.09979 4.5 5.18964 7.41015 5.18964 11C5.18964 14.5898 8.09979 17.5 11.6896 17.5Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );

  if (type === 'csr')
    return (
      <svg fill="none" viewBox="0 0 52 20" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M50.3961 2.6262C49.5661 1.57329 48.4872 0.79835 47.1895 0.399281C46.1239 0.07069 45.0355 -0.0975394 43.898 0.110564C42.7605 0.3188 41.6983 0.709268 40.7634 1.39565C40.0062 1.95108 39.3809 2.64874 38.7071 3.29332C38.4284 3.55937 38.3187 3.54603 38.1181 3.22077C37.2774 1.86254 36.0779 0.931373 34.5655 0.409949C33.2738 -0.0350619 31.9533 -0.132812 30.6192 0.223717C29.6546 0.481095 28.7392 0.848892 27.9611 1.48747C27.2732 2.05284 26.6432 2.68468 26.0138 3.30926C25.8213 3.50082 25.6827 3.49615 25.5285 3.28859C25.3899 3.10242 25.2445 2.92145 25.1105 2.73255C24.2726 1.54928 23.1101 0.79835 21.7484 0.348738C20.6771 -0.0106465 19.5298 -0.0876744 18.4193 0.125233C17.4333 0.306525 16.4931 0.678332 15.6522 1.21942C15.01 1.6311 14.5389 2.23307 13.9734 2.73589C13.1732 3.45228 13.324 3.45161 12.6273 2.75122C11.788 1.90381 10.9344 1.0884 9.80036 0.618786C7.13489 -0.474072 4.65111 -0.114209 2.43668 1.6577C0.774723 2.98727 0.045831 4.81845 0.00542677 6.91762C-0.0188158 7.30935 0.0417899 7.68649 0.115191 8.06895C0.286846 9.02235 0.654545 9.93065 1.19547 10.7375C1.75547 11.5616 2.51399 12.2007 3.21474 12.8978C4.68747 14.3611 6.17637 15.8178 7.65719 17.2744C8.39753 18.0027 9.12857 18.7277 10.085 19.2126C11.5133 19.9363 13.0157 20.1664 14.5591 19.8811C15.8844 19.6363 17.1001 19.0709 18.0787 18.1032C18.5511 17.6355 19.0243 17.1685 19.4983 16.7024C19.6713 16.5321 19.8496 16.4363 20.0119 16.7077C20.4796 17.4873 21.1056 18.1204 21.8326 18.6659C22.5161 19.1797 23.2982 19.5502 24.1311 19.7547C24.9751 19.9664 25.8507 20.0254 26.7159 19.929C27.6992 19.8116 28.6487 19.5004 29.5085 19.0137C30.5519 18.4384 31.309 17.5371 32.1471 16.729C32.4795 16.4084 32.4742 16.4037 32.7179 16.7782C33.7639 18.3838 35.2278 19.4255 37.1138 19.8252C38.3207 20.0812 39.537 20.0666 40.7337 19.6582C41.6761 19.3363 42.5511 18.9053 43.268 18.2255C44.3261 17.2238 45.3505 16.1856 46.3884 15.1619C47.1396 14.421 47.8935 13.6827 48.6392 12.9364C49.3124 12.2606 50.0528 11.6407 50.6121 10.8612C51.5659 9.53094 51.9267 8.04568 51.8392 6.41346C51.7718 5.03228 51.2669 3.70723 50.3961 2.6262ZM26.5058 7.7743C26.4385 8.50596 26.2184 9.17108 25.9283 9.82092C25.6025 10.5486 25.1206 11.1878 24.5478 11.7498C23.4036 12.8805 22.2425 14.0053 21.0894 15.1327C20.7637 15.4512 20.442 15.7725 20.1162 16.0905C19.8583 16.3419 19.7709 16.3246 19.6187 15.9913C19.2068 15.0881 18.9719 14.1463 19.0016 13.3521C19.0016 11.2656 19.6329 9.63803 20.9912 8.29706C21.9097 7.39116 22.8273 6.48438 23.7441 5.57672C24.3265 5.00435 24.9112 4.43431 25.4983 3.86662C25.7197 3.65311 25.8274 3.68305 25.9586 3.9717C26.5079 5.18825 26.6317 6.452 26.5058 7.7743ZM39.1601 7.86605C38.9911 8.76734 38.736 9.64796 38.2211 10.4462C37.5446 11.4957 36.6057 12.3025 35.7441 13.1778C35.067 13.8642 34.373 14.5347 33.6864 15.2125C33.4024 15.4925 33.1258 15.7805 32.8323 16.0512C32.5105 16.3492 32.4102 16.3346 32.2372 15.9401C32.0926 15.6076 31.9458 15.267 31.8745 14.9158C31.756 14.3265 31.5649 13.7405 31.6348 13.3321C31.6618 11.5236 32.1363 10.083 33.156 8.82322C33.7012 8.14943 34.3575 7.5874 34.9687 6.97876C35.3847 6.56442 35.7912 6.14008 36.2132 5.73101C36.8487 5.11444 37.476 4.48919 38.1074 3.86869C38.2978 3.68172 38.4385 3.71166 38.5596 3.95177C38.7952 4.41738 38.9318 4.91153 39.0578 5.41509C39.2685 6.21545 39.303 7.05134 39.1588 7.86605H39.1601Z"
          fill="currentColor"
        />
      </svg>
    );

  if (type === '@calendar')
    return (
      <svg fill="none" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          clipRule="evenodd"
          d="M14.9356 3.20366C14.9327 2.9765 14.9267 2.77058 14.9194 2.58939C14.8891 1.83559 14.3726 1.13848 13.5138 1.08671C13.3328 1.0758 13.1214 1.06909 12.875 1.06909C12.6286 1.06909 12.4172 1.0758 12.2362 1.08671C11.3774 1.13848 10.8609 1.83559 10.8306 2.58939C10.8261 2.7008 10.8221 2.82157 10.8191 2.95088C10.4018 2.94224 9.96222 2.9375 9.5 2.9375C9.03778 2.9375 8.5982 2.94224 8.18094 2.95088C8.17786 2.82157 8.17389 2.7008 8.16942 2.58939C8.13909 1.83559 7.62264 1.13848 6.76381 1.08671C6.58284 1.0758 6.37145 1.06909 6.125 1.06909C5.87855 1.06909 5.66716 1.0758 5.48619 1.08671C4.62736 1.13848 4.11092 1.83559 4.08058 2.58939C4.07329 2.77058 4.06735 2.9765 4.06444 3.20366C3.83842 3.2289 3.63201 3.25437 3.44492 3.27931C2.37176 3.42236 1.54422 4.23707 1.39031 5.3111C1.23385 6.4028 1.0625 8.12615 1.0625 10.4375C1.0625 12.7488 1.23385 14.4722 1.39031 15.5639C1.54422 16.6379 2.37176 17.4526 3.44492 17.5957C4.64439 17.7556 6.63807 17.9375 9.5 17.9375C12.3619 17.9375 14.3556 17.7556 15.5551 17.5957C16.6282 17.4526 17.4558 16.6379 17.6097 15.5639C17.7662 14.4722 17.9375 12.7488 17.9375 10.4375C17.9375 8.12615 17.7662 6.4028 17.6097 5.3111C17.4558 4.23707 16.6282 3.42236 15.5551 3.27931C15.368 3.25437 15.1616 3.2289 14.9356 3.20366ZM5.28125 9.5C5.28125 9.03402 5.65903 8.65625 6.125 8.65625H12.875C13.341 8.65625 13.7188 9.03402 13.7188 9.5C13.7188 9.96597 13.341 10.3437 12.875 10.3437H6.125C5.65903 10.3437 5.28125 9.96597 5.28125 9.5ZM6.125 12.4062C5.65903 12.4062 5.28125 12.784 5.28125 13.25C5.28125 13.716 5.65903 14.0938 6.125 14.0938H9.5C9.96597 14.0938 10.3438 13.716 10.3438 13.25C10.3438 12.784 9.96597 12.4062 9.5 12.4062H6.125Z"
          fill="url(#paint0_linear_7_118)"
          fillRule="evenodd"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_7_118"
            x1="1.0625"
            x2="17.9375"
            y1="9.5033"
            y2="9.5033"
          >
            <stop stopColor="#3098E1" />
            <stop offset="1" stopColor="#5EB6F5" />
          </linearGradient>
        </defs>
      </svg>
    );

  throw new Error('Invalid Icon type');
}
