import React, { useRef, useEffect } from "react";
import ProfileBox from "./ProfileBox";

function ProfileContainer({ users, onClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container.scrollWidth > container.clientWidth) {
      container.style.justifyContent = "flex-start";
    } else {
      container.style.justifyContent = "center";
    }
  }, [users]);

  return (
    <div
      id="profile-boxes"
      ref={containerRef}
      className="flex gap-4 overflow-x-auto my-16 w-11/12 m-auto"
    >
      {users.map((user) => (
        <ProfileBox key={user.id} user={user} onClick={onClick} />
      ))}
    </div>
  );
}

export default ProfileContainer;
