import Icon from '@/components/core/Icon';

export default function SparkDisclaimer() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-12">
        <Icon type="warning" className="w-20 shrink-0 text-c-red" />
        <div className="text-20 font-700 text-black">Disclaimer</div>
      </div>
      <div className="flex flex-col gap-24 text-justify text-14 font-400 leading-6 text-black lg:text-16 lg:leading-7">
        <p>
          Spark is an AI-based chatbot designed to provide various information and data related to
          CSR(첫사랑). This chatbot is intended to swiftly answer a range of user inquiries,
          delivering rich information about the group&apos;s activities, member introductions,
          music, and fan-related news.
        </p>
        <p>
          However, while significant efforts have been made to ensure the accuracy and usefulness of
          the information provided by Spark,{' '}
          <span className="bg-c-yellow/50 px-2 font-600">
            we cannot guarantee that all information is 100% accurate.
          </span>{' '}
          Additionally, the data supplied by Spark{' '}
          <span className="bg-c-yellow/50 px-2 font-600">may not always be up to date</span>, which
          could lead to discrepancies between the information provided and actual circumstances.
          Therefore, users are advised to utilize the information from Spark for reference purposes
          only and to consult official materials or reputable sources for further verification.
          Spark does not assume any responsibility for any errors or omissions in the information
          provided.{' '}
          <span className="bg-c-yellow/50 px-2 font-600">
            If Spark provides an incorrect answer, please use the report button or the “Teach Spark”
            menu within the chat to inform us.
          </span>{' '}
          Your input will be invaluable for future improvements.
        </p>
        <p>
          Currently, Spark is not a fully developed model,{' '}
          <span className="bg-c-yellow/50 px-2 font-600">
            so we encourage users to engage with it as a tool for fun and entertainment.
          </span>{' '}
          We kindly ask that users approach Spark with an understanding of its limitations and to
          use it thoughtfully. Spark is committed to providing the best possible responses to your
          questions and enhancing your experience.
        </p>
      </div>
    </div>
  );
}
