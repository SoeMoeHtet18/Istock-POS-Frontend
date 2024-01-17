import React from "react";

function ProfileBox({ user, onClick }) {
  return (
    <div
      className="bg-black center rounded-md p-4"
      style={{
        minWidth: "120px",
        maxWidth: "120px",
      }}
      onClick={() => onClick(user)}
    >
      <img
        src={process.env.PUBLIC_URL + "/logo/profile.png"}
        alt="Profile Avatar"
        width={30}
        height={30}
      />
      <p
        className="text-white text-center font-semibold overflow-hidden whitespace-nowrap mt-2"
        style={{ maxWidth: "80px" }}
      >
        {user.name}
      </p>
    </div>
  );
}

export default ProfileBox;
