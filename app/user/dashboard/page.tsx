"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AchievementBadges from "@/app/Components/AchievementBadges";
import AIAssistant from "@/app/Components/AiAssistant";
import ProgressTracker from "@/app/Components/ProgressTracker";
import { client } from "@/sanity/lib/client";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

// Certificate Component with styled content
interface CertificateProps {
  name: string;
  topic: string;
  date: string;
}

const Certificate = ({ name, topic, date }: CertificateProps) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#fffdf6",
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 10,
      color: "#000",
      fontWeight: "bold",
    },
    subheader: {
      fontSize: 16,
      textAlign: "center",
      color: "#333",
      marginBottom: 20,
    },
    recipient: {
      fontSize: 28,
      textAlign: "center",
      color: "#DAA520",
      fontWeight: "bold",
      marginBottom: 10,
    },
    bodyText: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 5,
      color: "#333",
    },
    footer: {
      marginTop: 30,
      textAlign: "center",
      fontSize: 12,
      color: "#666",
      fontStyle: "italic",
    },
    borderBox: {
      border: "2pt solid #DAA520",
      padding: 30,
      borderRadius: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderBox}>
          <Text style={styles.header}>CERTIFICATE</Text>
          <Text style={styles.subheader}>of Completion</Text>
          <Text style={styles.bodyText}>
            This certificate is proudly presented to
          </Text>
          <Text style={styles.recipient}>{name}</Text>
          <Text style={styles.bodyText}>
            For successfully completing the{" "}
            <Text style={{ fontWeight: "bold" }}>{topic}</Text> course.
          </Text>
          <Text style={styles.footer}>Issued by GenZ - Way on {date}</Text>
        </View>
      </Page>
    </Document>
  );
};

const DashboardHome = () => {
  const { data: session } = useSession();
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [showCertificates, setShowCertificates] = useState(false);

  useEffect(() => {
    const fetchUserActivity = async () => {
      if (session) {
        const activity = await client.fetch(`
          *[_type == "userActivity" && userId == "${session.user?.email}"]{
            courseId,
            status
          }
        `);
        if (activity.length === 0) setShowAlert(true);
        setUserActivity(activity);
      }
    };

    const fetchCertificates = async () => {
      if (session) {
        const certs = await client.fetch(`
          *[_type == "certificate" && username == "${session.user?.name}"]{
            _id, topic, score, date
          }
        `);
        setCertificates(certs);
      }
    };

    fetchUserActivity();
    fetchCertificates();
  }, [session]);

  return (
    <section className="space-y-8">
      {showAlert && (
        <div className="p-4 border-l-4 border-[#00FFC6] bg-[#1a1a1a] text-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p className="font-semibold text-[#00FFC6] mb-1">
              No Activity Yet! 🚨
            </p>
            <p className="text-sm text-gray-300">
              Start your first course to begin your journey.
            </p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="ml-4 px-4 py-1 rounded-full border border-[#00FFC6] text-[#00FFC6] hover:bg-[#00ffc615] transition"
          >
            Got it
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold p-5 text-white">Your Activity</h2>
        <ul className="list-disc pl-5 text-gray-300">
          {userActivity.length > 0 ? (
            userActivity.map((activity) => (
              <li key={activity.courseId}>
                <strong>{activity.courseId}</strong> - {activity.status}
              </li>
            ))
          ) : (
            <p className="p-1 text-red-400">No activity yet!</p>
          )}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <ProgressTracker />
        <AchievementBadges />
        <AIAssistant />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowCertificates(!showCertificates)}
          className="px-6 py-2 bg-gradient-to-r from-[#00FFC6] to-[#00b38f] text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
        >
          {showCertificates ? "Hide Certificates" : "View Certificates"}
        </button>
      </div>

      {showCertificates && (
        <div>
          <h2 className="text-2xl font-bold text-white mt-4 text-center mb-6">
            🎓 Certificates Obtained
          </h2>
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  className="relative p-6 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-300"
                >
                  <div className="absolute top-4 right-4 text-3xl">🎖️</div>
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-900">
                    Certificate of Completion
                  </h3>
                  <div className="border-t border-gray-300 my-3"></div>
                  <p className="text-md mb-1">
                    <span className="font-semibold">Recipient:</span>{" "}
                    {session?.user?.name}
                  </p>
                  <p className="text-md mb-1">
                    <span className="font-semibold">Topic:</span> {cert.topic}
                  </p>
                  <p className="text-md mb-1">
                    <span className="font-semibold">Score:</span> {cert.score}%
                  </p>
                  <p className="text-md mb-1">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(cert.date).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <span className="px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full">
                      🎉 Congratulations!
                    </span>
                  </div>
                  <div className="mt-4 text-center">
                    <PDFDownloadLink
                      document={
                        <Certificate
                          name={session?.user?.name || ""}
                          topic={cert.topic}
                          date={new Date(cert.date).toLocaleDateString()}
                        />
                      }
                      fileName={`${cert.topic}-certificate.pdf`}
                      className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                      {({ loading }) =>
                        loading ? "Preparing..." : "Download Certificate"
                      }
                    </PDFDownloadLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-4">
              No certificates yet! Complete a quiz to earn one.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default DashboardHome;
