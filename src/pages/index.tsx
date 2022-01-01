import { Dispatch, SetStateAction } from "react";
import type { pages } from "../logic/frontend";
import { createSigner } from "fast-jwt";

export async function getServerSideProps(ctx: {}) {
  const payload = {
    resource: { dashboard: 1 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60,
  };

  const signer = createSigner({
    key: async () => process.env.METABASE_API_KEY,
  });
  const token = await signer(payload);
  return {
    props: {
      metabaseurl: `${process.env.METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false`,
    },
  };
}

export default function HomePage({
  metabaseurl,
  setCurrent,
}: {
  metabaseurl: string;
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  setCurrent("dashboard");
  return (
    <div>
      <div
        style={{
          width: "clamp(22.5vw, 20vw, 30.5vw)",
          overflow: "hidden",
          position: "fixed",
          right: "1.5rem",
        }}
      >
        <iframe
          src={metabaseurl}
          frameBorder="0"
          width="300%"
          height="850"
          style={{ transform: "translate(0%)" }}
          allowTransparency
        />
      </div>
    </div>
  );
}
