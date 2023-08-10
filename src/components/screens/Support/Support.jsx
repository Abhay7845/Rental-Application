const [addressType, setAddressType] = useState("");

<div className="col-md-4">
  <label className="form-label">Addeess ID Proof Type</label>
  <select
    className="form-control"
    value={
      existedUserData.addressProofIdType
        ? existedUserData.addressProofIdType
        : addressType
    }
    disabled={existedUserData.addressProofIdType ? true : false}
    onChange={(e) => setAddressType(e.target.value)}
  >
    <option value="">Select Type</option>
    {addressTypeOption.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.name}
        </option>
      );
    })}
  </select>
</div>;
